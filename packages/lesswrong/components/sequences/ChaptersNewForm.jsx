import { Components, registerComponent, getFragment } from 'meteor/vulcan:core';
import { withMessages } from '../common/withMessages';
import React from 'react';
import Chapters from '../../lib/collections/chapters/collection.js';

//TODO: Manage chapter removal to remove the reference from all parent-sequences

const ChaptersNewForm = (props) => {
  return (
    <div className="chapters-new-form">
      <h3>Add Chapter</h3>
      <Components.WrappedSmartForm
        collection={Chapters}
        successCallback={props.successCallback}
        cancelCallback={props.cancelCallback}
        prefilledProps={props.prefilledProps}
        fragment={getFragment('ChaptersFragment')}
        queryFragment={getFragment('ChaptersFragment')}
        mutationFragment={getFragment('ChaptersFragment')}
      />
    </div>
  )
}

registerComponent('ChaptersNewForm', ChaptersNewForm, withMessages);
