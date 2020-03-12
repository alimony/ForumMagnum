import React from 'react';
import { Components, registerComponent } from '../../lib/vulcan-lib';
import { useMulti } from '../../lib/crud/withMulti';
import MenuItem from '@material-ui/core/MenuItem'
import { LWEvents } from '../../lib/collections/lwevents/collection'

const LastVisitList = ({ terms, clickCallback }) => {
  const { results, loading } = useMulti({
    terms,
    collection: LWEvents,
    fragmentName: 'lastEventFragment',
    enableTotal: false,
  });
  if (!loading && results) {
    return <>{results.map((event) =>
        <MenuItem key={event._id} dense onClick={() => clickCallback(event.createdAt)}>Visit at: <Components.CalendarDate date={event.createdAt}/> </MenuItem>
      )}</>
  } else {
    return <Components.Loading />
  }
}

const LastVisitListComponent = registerComponent("LastVisitList", LastVisitList);

declare global {
  interface ComponentTypes {
    LastVisitList: typeof LastVisitListComponent,
  }
}

