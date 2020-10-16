import Firebase from 'firebase';

export default async function ChangeUsername(values) {
  //obtain the user and username of logged in user as objects
  const user = Firebase.auth().currentUser;
  const userKey = user.uid;
  user.updateProfile({displayName: values.username}).then(() => {
    Firebase.database()
      .ref('users/' + userKey)
      .update({username: values.username});
  });
  // .then(() => {
  //   if (this.state.posts === null) {
  //     this.props.navigation.navigate('Account');
  //   } else {
  //     this.state.posts.forEach((post) => {
  //       const uid = post.userkey;
  //       const postKey = post.id;
  //       if (userKey === uid) {
  //         Firebase.database()
  //           .ref('posts/' + postKey)
  //           .update({
  //             createdBy: values.username,
  //           });
  //       }
  //     });
  //   }
  // })
  // .then(() => {
  //   if (this.state.userPosts === null) {
  //     this.props.navigation.navigate('Account');
  //   } else {
  //     this.state.userPosts.forEach((post) => {
  //       const uid = post.userkey;
  //       const postKey = post.id;
  //       if (userKey === uid) {
  //         Firebase.database()
  //           .ref('user_posts/' + userKey + '/' + postKey)
  //           .update({
  //             createdBy: values.username,
  //           });
  //       }
  //     });
  //   }
  // });
}
