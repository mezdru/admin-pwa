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

	// @todo Remake this method with same logic as onboard stepper 
	buildSteps(org, locale) {
		return [
			this.props.intl.formatMessage({ id: 'settings.onboard.steps.intro' }),
			this.props.intl.formatMessage({ id: 'settings.onboard.steps.contacts' }),
			this.props.intl.formatMessage({ id: 'settings.onboard.steps.wings' })
		];
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
