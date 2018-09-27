import Users from 'meteor/vulcan:users';

const membersActions = [
  "posts.subscribe",
  "posts.unsubscribe",
  "comments.subscribe",
  "comments.unsubscribe",
  "users.subscribe",
  "users.unsubscribe",
  "localgroups.subscribe",
  "localgroups.unsubscribe"
];

Users.groups.members.can(membersActions);
