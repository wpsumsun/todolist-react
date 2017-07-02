import AV from 'leancloud-storage';

var APP_ID = 'TcKXEXg5IsNXUhP1eOr9cXKP-gzGzoHsz';
var APP_KEY = '4VS9JuccvUwgyldGcRncMv7N';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel={
  getByUser(user,successFn,errorFn){
    let query=new AV.Query('Todo')
    query.find().then((response)=>{
      let array=response.map((t)=>{
        return {id:t.id,...t.attributes}
      })
      successFn.call(null,array)
    },(error)=>{
      errorFn&&errorFn.call(null,error)
    })
  },

  create({status,title,deleted},successFn,errorFn){
    let Todo=AV.Object.extend('Todo');
    let todo=new Todo;
    todo.set("status",status)
    todo.set("title",title)
    todo.set("deleted",deleted)

     // 新建一个 ACL 实例
    var acl = new AV.ACL();
    acl.setPublicReadAccess(false);
    acl.setWriteAccess(AV.User.current(),true);

    // 将 ACL 实例赋予 Post 对象
    todo.setACL(acl);

    todo.save().then(function (response) {
    // 成功保存之后，执行其他逻辑.
      successFn.call(null,response.id)
    }, function (error) {
      // 异常处理
      errorFn&&errorFn.call(null,error)
    })
  }

  
}

export function signUp(email,username,password,successFn,errorFn){
    // 新建 AVUser 对象实例
  var user = new AV.User();
  // 设置用户名
  user.setUsername(username);
  // 设置密码
  user.setPassword(password);
  // 设置邮箱
  user.setEmail(email);
  user.signUp().then(function (loginedUser) {
      let user=getUserFromAVUser(loginedUser)
      successFn.call(null,user)
  }, function (error) {
    errorFn.call(null,error)
  });

  return undefined
}

export function signIn(username,password,successFn,errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user=getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  }, function (error) {
    errorFn.call(null,error)
  });
}

export function getCurrentUser(){
  let user = AV.User.current();
  if (user) {
     return getUserFromAVUser(user)
  }
  else {
     return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

export function sendPasswordResetEmail(email,successFn,errorFn){
  AV.User.requestPasswordReset(email).then(function(success){
    successFn.call()
  },function(error){
    console.dir(error)
  })
}

function getUserFromAVUser(AVUser){
  return {
    id:AVUser.id,
    ...AVUser.attributes

  }
}