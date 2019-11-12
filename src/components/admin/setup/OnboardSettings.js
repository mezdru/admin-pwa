import React from 'react';
import { withStyles, Grid, Typography, Stepper, Step, StepLabel, Button } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { injectIntl, FormattedHTMLMessage, FormattedMessage } from 'react-intl';

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
				<Grid item xs={12}  className={classes.cta}>
					<Button color="secondary" component="a" href="mailto:contact@wingzy.com" target="_blank" >
						<FormattedMessage id="settings.onboard.contact" />
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default inject('orgStore', 'commonStore')(observer(
	withStyles(style)(injectIntl(OnboardSettings))
))
