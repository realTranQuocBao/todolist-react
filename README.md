# Cập nhật:
- Demo: [todo.quocbaoit.com](http://todo.quocbaoit.com)
- Đã cấu trúc lại dự án theo những gì đọc từ bài góp ý Nhựt
- Đã thêm các dialog để xác nhận khi sửa, xóa, cũng như các toast message để thông báo kết quả.

# Yêu cầu:
- Do chưa setup kịp project cho mọi người code chung, nên giờ mỗi bạn tự init project giúp a và code 1 project huyền thoại "TODO LIST" nha :d
- Các chức năng cơ bản:
+ Thêm, sửa, xóa, tìm kiếm task - Khi thêm cần có lưu lại thời gian thêm task, chỉnh sửa thì lưu lại thời gian chỉnh sửa
+ Trạng thái của task gồm 3 trạng thái: 
+ Check hoàn thành task, lưu lại thời gian hoàn thành.
+ Filter được task nào đã done, task nào đang thực hiện.

UI bạn bạn có thể sử dụng lib tùy ý nha, ko cần code UI chay
Dữ liệu lưu các task mọi người có thể sử dụng tùy ý nha: redux, local storage, session storage,..

Mọi người push code lên github, gitlab,... Xong đưa a review qua nha, Thanks ae

Những lib mọi người có thể tham khảo qua, nếu thấy xài được vào thì sử dụng nhé  :
- redux: quản lý dữ liệu
- lodash: xử lí array,object,collection,..
- react hook form: xử lí form trên reactjs
- moment: xử lí về thời gian
- styled components: custom ui

# Demo

![Header](https://github.com/realTranQuocBao/todolist-react/raw/main/public/demo/demo1.png)
![Body](https://github.com/realTranQuocBao/todolist-react/raw/main/public/demo/demo2.png)
![For mobile](https://github.com/realTranQuocBao/todolist-react/raw/main/public/demo/demo3.png)

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
