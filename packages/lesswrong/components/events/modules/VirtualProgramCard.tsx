import { Components, registerComponent, } from '../../../lib/vulcan-lib';
import React from 'react';
import { createStyles } from '@material-ui/core/styles';
import * as _ from 'underscore';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
import moment from 'moment';
import { useTracking } from '../../../lib/analyticsEvents';

const styles = createStyles((theme: ThemeType): JssStyles => ({
  eventCard: {
    position: 'relative',
    width: 373,
    height: 374,
    borderRadius: 0,
    overflow: 'visible',
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100vw'
    }
  },
  introVPCard: {
    background: "linear-gradient(rgba(0, 87, 102, 0.7), rgba(0, 87, 102, 0.7)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_373,c_fill,q_auto,f_auto/Event/pz3xmsm63xl8thlyt2up.jpg')",
    padding: '50px 24px',
    '& .VirtualProgramCard-eventCardDescription': {
      opacity: 1,
      marginTop: 30
    },
    '& .VirtualProgramCard-eventCardDeadline': {
      marginTop: 30
    }
  },
  cardLink: {
    '&:hover': {
      opacity: '0.9'
    },
    '&:hover .VirtualProgramCard-eventCardDeadline': {
      borderBottom: '2px solid white'
    }
  },
  cardSection: {
    display: 'flex',
    width: 373,
    height: 243,
    padding: 20,
    overflow: 'hidden'
  },
  inDepthSection: {
    background: "linear-gradient(rgba(0, 87, 102, 0.7), rgba(0, 87, 102, 0.7)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/f2cbeqvjyhyl6rhhzdsu.jpg')",
    // background: "linear-gradient(rgb(95, 73, 47, 0.7), rgb(95, 73, 47, 0.7)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/f2cbeqvjyhyl6rhhzdsu.jpg')",
    // background: "linear-gradient(rgb(198, 156, 106, 0.7), rgb(198, 156, 106, 0.7)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/f2cbeqvjyhyl6rhhzdsu.jpg')",
    clipPath: 'polygon(0 0, 100% 0, 100% 54%, 0 100%)'
  },
  precipiceSection: {
    // background: "linear-gradient(rgb(153, 106, 0, 0.6), rgb(153, 106, 0, 0.6)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/xfhrtorwdxxmplaofqa8.jpg')",
    // background: "linear-gradient(rgb(95, 73, 47, 0.7), rgb(95, 73, 47, 0.7)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/xfhrtorwdxxmplaofqa8.jpg')",
    background: "linear-gradient(rgb(168, 114, 51, 0.5), rgb(168, 114, 51, 0.5)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/xfhrtorwdxxmplaofqa8.jpg')",
    // background: "linear-gradient(rgb(198, 156, 106, 0.4), rgb(198, 156, 106, 0.4)), url('https://res.cloudinary.com/cea/image/upload/w_374,h_243,c_fill,q_auto,f_auto/Event/xfhrtorwdxxmplaofqa8.jpg')",
    clipPath: 'polygon(0 46%, 100% 0, 100% 100%, 0 100%)',
    position: 'absolute',
    bottom: 0,
    alignItems: 'flex-end',
    textAlign: 'right'
  },
  eventCardTime: {
    ...theme.typography.commentStyle,
    fontSize: 14,
    color: 'white'
  },
  eventCardTitle: {
    ...theme.typography.headline,
    color: 'white',
    fontSize: 22,
    display: '-webkit-box',
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": 'vertical',
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 0
  },
  eventCardLocation: {
    ...theme.typography.commentStyle,
    opacity: '0.7',
    color: 'white',
    fontSize: 14,
    marginTop: 8,
  },
  eventCardDescription: {
    ...theme.typography.commentStyle,
    opacity: '0.7',
    color: 'white',
    fontSize: 14,
    lineHeight: '1.5em',
    marginTop: 10,
  },
  eventCardDeadline: {
    ...theme.typography.commentStyle,
    display: 'inline-block',
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    paddingBottom: 5,
    marginTop: 10,
    borderBottom: '2px solid transparent'
  },
}))


const VirtualProgramCard = ({program, classes}: {
  program: string,
  classes: ClassesType,
}) => {
  const { captureEvent } = useTracking()
  
  // find the next deadline for applying to the Intro VP, which is the last Sunday of every month
  let sunday = moment().day(0)
  _.range(5).forEach(() => {
    const nextSunday = moment(sunday).add(1, 'week')
    // needs to be in the future
    if (sunday.isBefore(moment(), 'day')) {
      sunday = nextSunday
    }
    // needs to be the last Sunday of the month
    if (nextSunday.month() === sunday.month()) {
      sunday = nextSunday
    }
  })
  
  // VP starts 8 days after the deadline, on a Monday
  const startOfVp = moment(sunday).add(8, 'days')
  // VP ends 8 weeks after the start (subtract a day to end on a Sunday)
  const endOfVp = moment(startOfVp).add(8, 'weeks').subtract(1, 'day')

  if (program === 'intro') {
    return <a
      href="https://www.effectivealtruism.org/virtual-programs/introductory-program?from=forum_events_page"
      className={classes.cardLink}
      onClick={() => captureEvent('introVPClicked')}
    >
      <Card className={classNames(classes.eventCard, classes.introVPCard)}>
        <div className={classes.eventCardTime}>
          {startOfVp.format('MMMM D')} - {endOfVp.format('MMMM D')}
        </div>
        <div className={classes.eventCardTitle}>
          Introductory EA Program
        </div>
        <div className={classes.eventCardLocation}>Online</div>
        <div className={classes.eventCardDescription}>
          For those new to effective altruism, or those who have some familiarity,
          but want to explore the core ideas in a structured way
        </div>
        <div className={classes.eventCardDeadline}>Apply by Sunday, {sunday.format('MMMM D')}</div>
      </Card>
    </a>
  }
  
  if (program === 'advanced') {
    return <Card className={classes.eventCard}>
        <a
          href="https://www.effectivealtruism.org/virtual-programs/in-depth-program?from=forum_events_page"
          className={classNames(classes.cardLink, classes.cardSection, classes.inDepthSection)}
          onClick={() => captureEvent('inDepthVPClicked')}
        >
          <div>
            <div className={classes.eventCardTime}>
              {startOfVp.format('MMMM D')} - {endOfVp.format('MMMM D')}
            </div>
            <div className={classes.eventCardTitle}>
              In-Depth EA Program
            </div>
            <div className={classes.eventCardDescription}>
              Dive deeper into more complex EA ideas and examine your key uncertainties
            </div>
            <div className={classes.eventCardDeadline}>Apply by Sunday, {sunday.format('MMMM D')}</div>
          </div>
        </a>
        <a
          href="https://www.effectivealtruism.org/virtual-programs/the-precipice-reading-group?from=forum_events_page"
          className={classNames(classes.cardLink, classes.cardSection, classes.precipiceSection)}
          onClick={() => captureEvent('precipiceVPClicked')}
        >
          <div>
            <div className={classes.eventCardTime}>
              {startOfVp.format('MMMM D')} - {endOfVp.format('MMMM D')}
            </div>
            <div className={classes.eventCardTitle}>
              <em>The Precipice</em> Reading Group
            </div>
            <div className={classes.eventCardDescription}>
              Read and discuss this book about existential risks and safeguarding the future of humanity
            </div>
            <div className={classes.eventCardDeadline}>Apply by Sunday, {sunday.format('MMMM D')}</div>
          </div>
        </a>
      </Card>
  }
  
  return null
}

const VirtualProgramCardComponent = registerComponent('VirtualProgramCard', VirtualProgramCard, {styles});

declare global {
  interface ComponentTypes {
    VirtualProgramCard: typeof VirtualProgramCardComponent
  }
}
