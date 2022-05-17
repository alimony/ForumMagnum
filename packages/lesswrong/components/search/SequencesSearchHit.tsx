import React from 'react';
import { Components, registerComponent} from '../../lib/vulcan-lib';
import { Link } from '../../lib/reactRouterWrapper';
import type { Hit } from 'react-instantsearch-core';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import { Snippet } from 'react-instantsearch-dom';

const styles = (theme: ThemeType): JssStyles => ({
  root: {
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    borderBottom: theme.palette.border.faint
  },
  title: {
    display: "inline",
    ...theme.typography.postStyle,
    fontSize: "1.25rem",
    fontVariant: "small-caps",
    marginRight: 8,
    textDecoration: "none",
    "& a:hover": {
      color: "inherit",
    },
  },
  icon: {
    width: 20,
    color: theme.palette.grey[500],
    marginRight: 12,
    marginLeft: 4
  },
  meta: {
    display: "inline-block",
    color: theme.palette.text.dim,
    "& div": {
      display: "inline-block",
      marginRight: 5,
    }
  },
  snippet: {
    ...theme.typography.postStyle,
    lineHeight: "1.3rem",
    marginTop: 4
  }
});

const SequencesSearchHit = ({hit, clickAction, classes}: {
  hit: Hit<any>,
  clickAction?: any,
  classes: ClassesType,
}) => {
  const sequence: AlgoliaSequence = hit;
  const { LWTooltip, MetaInfo } = Components
  return <div className={classes.root}>
      <LWTooltip title="Sequence">
        <LocalLibraryIcon className={classes.icon}/>
      </LWTooltip>
      <Link to={"sequences/" + sequence._id} onClick={() => clickAction(sequence._id)}>
        <div className="sequences-item-body ">
          <div className={classes.title}>
            {sequence.title}
          </div>
          <div className={classes.meta}>
            <MetaInfo>{sequence.authorDisplayName}</MetaInfo>
            <MetaInfo className="sequences-item-created-date">
              <Components.FormatDate date={sequence.createdAt}/>
            </MetaInfo>
          </div>
        </div>
        <div className={classes.snippet}>
          <Snippet attribute="plaintextDescription" hit={sequence} tagName="mark" />
        </div>

      </Link>
  </div>
}

const SequencesSearchHitComponent = registerComponent("SequencesSearchHit", SequencesSearchHit, {styles});

declare global {
  interface ComponentTypes {
    SequencesSearchHit: typeof SequencesSearchHitComponent
  }
}

