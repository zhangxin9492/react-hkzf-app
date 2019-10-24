This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

项目结构
/src 
    asserts 静态资源
    componnets 公共组件
    pages 页面组件
    utils 公共函数
    App.txs 根组件
    index.tsx 项目入口


## 长列表渲染
    1.懒加载渲染,分页渲染,一般用于数据量较少的业务,一般小于1000条数据,因为大量数据会造成大量数据回流重绘,造成页面卡顿
    2.可视区渲染,利用算法只渲染可视区的部分,从根本上解决性能问题 react-virtualized
## 2019末几个计划
    1.熟练掌握react+typescript
    2.css3样式+css3动画回顾+熟练掌握
    3.2.x版本vue源码继续学习，并且对照3.x版本
    4.你不知道的JavaScript第一本看完
## ------typescript坑----
    1.每个组件的props和state都需要类型定
    2.非路由组件如果需要用到路由跳转需要使用高阶路由组件withRouter包裹，可以为当前组件带来路由的history match等属性
    3.使用withRouter包裹组件的时候定义props类型的时候需要interface AppProps extends RouteComponentProps，不然会报错，
    原因：原因时没有对withRouter所带来的prop下的属性没有进行类型判断
