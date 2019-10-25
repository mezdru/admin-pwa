import { observable, action, decorate, computed, observe } from "mobx";
import KeenTracking from 'keen-tracking';
import KeenAnalysis from 'keen-analysis';
import Store from "./store";
import orgStore from './organisation.store';
import undefsafe from 'undefsafe';

class KeenStore extends Store{

  constructor() {
    super("Organisation");
    this.queue = [];
    this.writesKeys = [];
    this.readKeys = [];
    this.client = null;
    this.readClient = null;

    this.unsubOrg = observe(orgStore, 'currentOrganisation', (change) => {
      if(change.newValue && undefsafe(change.oldValue, '_id') !== undefsafe(change.newValue, '_id')) {
        this.fetchKeenWritesKey(change.newValue._id, change.newValue.public)
        .then((key) => {
          if(key) {
            this.client = new KeenTracking({
              projectId: process.env.REACT_APP_KEEN_PROJECT_ID,
              writeKey: key
            });

            for(var i = 0; i < this.queue.length; i++) {
              this.recordEvent(this.queue[i].eventFamily, this.queue[i].object);
            }
            this.queue = [];
          }
        });
        this.fetchKeenReadKey(change.newValue._id)
        .then((key) => {
          if(key) {
            this.readClient = new KeenAnalysis({
              projectId: process.env.REACT_APP_KEEN_PROJECT_ID,
              readKey: key
            });
          }
        });
      }
    });
  }

  get currentKeenReadKey() {
    try { return this.getKeenWritesKey(orgStore.currentOrganisation._id) } catch (e) { return null; };
  }

  get currentKeenWritesKey() {
    try { return this.getKeenReadKey(orgStore.currentOrganisation._id) } catch (e) { return null; };
  }

  addKeenKey(key, orgId, type) {
    let variable = type === 'read' ? 'readKeys' : 'writesKeys';
    let newKeenKey = { value: key, organisation: orgId, initialized: false };
    let index = this[variable].findIndex(keenKey => JSON.stringify(keenKey.organisation) === JSON.stringify(orgId));
    if (index > -1) {
      this[variable][index] = newKeenKey;
    } else {
      this[variable].push(newKeenKey);
    }
  }

  getKeenWritesKey(orgId) {
    if (!orgId) return null;
    return this.writesKeys.find(key =>key.organisation === orgId);
  }

  getKeenReadKey(orgId) {
    if (!orgId) return null;
    return this.readKeys.find(key =>key.organisation === orgId);
  }

  async fetchKeenWritesKey(orgId, isPublic) {
    if (!orgId) throw new Error('Organisation id is required.');

    let keenKey = await super.fetchResources(`/${orgId}/keen/${isPublic ? 'public' : 'private'}`);
    this.addKeenKey(keenKey, orgId, 'writes');
    return keenKey;
  }

  async fetchKeenReadKey(orgId) {
    if (!orgId) throw new Error('Organisation id is required.');
    let keenKey = await super.fetchResources(`/${orgId}/keen/queries`);
    this.addKeenKey(keenKey, orgId, 'read');
    return keenKey;
  }

  recordEvent = (eventFamily, object) => {
    if(!this.client) return this.queue.push({eventFamily: eventFamily, object: object});
    // object.organisation = orgStore.currentOrganisation._id;
    // object.owner = undefsafe(userStore.currentUser, '_id') || null;
    return this.client.recordEvent(eventFamily, {
      item: object
    });
  }

}

decorate(KeenStore, {
  writesKeys: observable,
  readKeys: observable,
  fetchKeenWritesKey: action,
  fetchKeenReadKey: action,
  currentKeenWritesKey: computed,
  currentKeenReadKey: computed,
  addKeenKey: action,
  readClient: observable
});

export default new KeenStore();