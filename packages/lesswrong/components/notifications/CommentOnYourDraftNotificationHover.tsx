import React from 'react';
import { registerComponent, Components } from '../../lib/vulcan-lib/components';
import { useSingle } from '../../lib/crud/withSingle';
import { Link } from '../../lib/reactRouterWrapper';
import {useCurrentUser} from "../common/withUser";

const styles = (theme: ThemeType): JssStyles => ({
  root: {
    padding: 16,
    ...theme.typography.commentStyles,
    ...theme.typography.body2,
    maxWidth: 600,
  },
});

const CommentOnYourDraftNotificationHover = ({notification, classes}: {
  notification: NotificationsList,
  classes: ClassesType
}) => {
  const { UsersName, Loading } = Components;
  const postId = notification.documentId;
  const postEditUrl = `/editPost?postId=${postId}`
  const currentUser = useCurrentUser()
  const { document: post, loading: loadingPost } = useSingle({
    documentId: postId,
    collectionName: "Posts",
    fragmentName: "PostsMinimumInfo",
  });
  
  const senderUserId = notification.extraData?.senderUserID;
  
  const postOrDraft = post.draft ? "draft" : "post";
  
  return <div className={classes.root}>
    <div>
      {senderUserId ? <UsersName documentId={notification.extraData.senderUserID}/> : "Someone"}
      {(currentUser?._id !== post?.userId) ? " replied to your comment on " : ` commented on your draft ${postOrDraft}`}
      <Link to={postEditUrl}>
        {post ? post.title : <Loading/>}
      </Link>
    </div>
    
    {notification.extraData && <blockquote dangerouslySetInnerHTML={{__html: notification.extraData.commentHtml}}/>}
  </div>
}

const CommentOnYourDraftNotificationHoverComponent = registerComponent('CommentOnYourDraftNotificationHover', CommentOnYourDraftNotificationHover, {styles});

declare global {
  interface ComponentTypes {
    CommentOnYourDraftNotificationHover: typeof CommentOnYourDraftNotificationHoverComponent
  }
}
