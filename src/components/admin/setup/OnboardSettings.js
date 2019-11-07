import React from 'react';
import { withStyles, Grid, Typography, TextField, Button, Stepper, Step, StepLabel } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { FormattedMessage, injectIntl, FormattedHTMLMessage } from 'react-intl';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const style = theme => ({
	root: {
		position: 'relative',
		left: 0,
		right: 0,
		margin: 'auto',
		width: '100%'
	},
	cta: {
		textAlign: 'center',
		'& a': {
			color: theme.palette.secondary.main,
			fontWeight: 'bold',
			'&:hover': {
				color: theme.palette.secondary.dark
			}
		}
	}
});

class OnboardSettings extends React.Component {

	state = {
		steps: []
	}

	componentDidMount() {
		this.setState({ steps: this.buildSteps(this.props.orgStore.currentOrganisation, this.props.commonStore.locale) });
	}

	buildSteps(org, locale) {
		if (!org.onboardSteps || org.onboardSteps.length === 0) {
			return [
				this.props.intl.formatMessage({ id: 'settings.onboard.steps.intro' }),
				this.props.intl.formatMessage({ id: 'settings.onboard.steps.contacts' }),
				this.props.intl.formatMessage({ id: 'settings.onboard.steps.wings' })
			]
		}
		else {
			let steps = [];
			console.log(JSON.parse(JSON.stringify(org)))
			org.onboardSteps.forEach(step => {
				if (step.charAt(0) === '#') {
					let stepWings = org.featuredWingsFamily.find(f => f.tag === step);
					let title = stepWings.intro_translated ? (stepWings.intro_translated[locale] || stepWings.intro) : stepWings.intro;
					steps.push(title);
				} else {
					steps.push(this.props.intl.formatMessage({ id: 'settings.onboard.steps.' + step }));
				}
			});
			return steps;
		}
	}

	render() {
		const { classes } = this.props;
		const { steps } = this.state;

		return (
			<Grid container item xs={12} spacing={16} direction="column" className={classes.root} justify="flex-start" >
				<Grid item xs={12}>
					<Stepper activeStep={-1} alternativeLabel className={classes.root} >
						{steps.map(label => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
				</Grid>
				<Grid item xs={12} className={classes.cta} >
					<Typography variant="body1">
						<FormattedHTMLMessage id="settings.onboard.update" />
					</Typography>
				</Grid>
			</Grid>
		);
	}
}

export default inject('orgStore', 'userStore', 'commonStore')(observer(
	withStyles(style)(injectIntl(OnboardSettings))
))
