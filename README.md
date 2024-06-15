# GoalGuard

Đây là một dự án quản lý hệ thống đặt sân và dịch vụ mua hàng.

## Mô tả chức năng
### Admin: 
- Trang đăng nhập
- Trang quản lý tài khoản (Profile): Cho phép người dùng cập nhật thông tin cá nhân, thay đổi mật khẩu, ...
- Trang quản lý sân (dành cho quản trị viên): Cho phép quản trị viên phê duyệt sân
- Quản lý khu vực
- Quản lý loại sân
- Trang quản lý tài khoản: Cho phép quản trị viên xem thông tin, quản lý các tài khoản của toàn bộ hệ thống.
- Trang thống kê (dành cho quản trị viên): Hiển thị thống kê về hoạt động của hệ thống, doanh thu, ...: của tất cả hệ thống
+ Thống kê số lượng sân bóng, dịch vụ.
+ Thống kê số lượng khách hàng, lượt đặt sân.
+ Thống kê doanh thu theo ngày, tháng, năm.
- Phê duyệt đấu giải
- Quên mật khẩu
### Bên thứ 3: 
- Trang đăng nhập
- Trang quản lý tài khoản (Profile): Cho phép người dùng cập nhật thông tin cá nhân, thay đổi mật khẩu, ...
- Trang quản lý sân (dành cho bên thứ 3): Cho phép quản trị viên thêm, sửa, xóa sân bóng, dịch vụ, ... (Cài đặt thời gian mở cửa, đóng cửa của sân.)
- Trang thống kê (dành cho bên thứ 3: Hiển thị thống kê về hoạt động của hệ thống, doanh thu, ...:
+ Thống kê số lượng sân bóng, dịch vụ.
+ Thống kê số lượng khách hàng, lượt đặt sân.
+ Thống kê doanh thu theo ngày, tháng, năm.
- Quản lý sản phẩm (dịch vụ) -> giá, số lượng,...
- Tạo đấu giải đấu, lưu lại kết quả
- Quên mật khẩu
### Client:
- Trang chủ: Hiển thị thông tin chung về hệ thống, các sân bóng, dịch vụ, tin tức, ...
- Trang đăng nhập/đăng ký: Cho phép người dùng đăng nhập vào hệ thống hoặc tạo tài khoản mới.
- Trang quản lý tài khoản (Profile): Cho phép người dùng cập nhật thông tin cá nhân, thay đổi mật khẩu, ...
- Trang đặt sân: Cho phép người dùng tìm kiếm và đặt sân theo nhu cầu (Tìm kiếm sân bóng theo nhu cầu (thời gian, địa điểm, giá cả, ...).
- Trang thanh toán: Cho phép người dùng thanh toán cho các dịch vụ đã đặt.
- Trang lịch sử đặt sân: Cho phép người dùng xem lại lịch sử đặt sân của mình.
- Xem kết quả đấu giải
### Seller: 
- Trang đăng nhập
- Trang quản lý tài khoản (Profile): Cho phép người dùng cập nhật thông tin cá nhân, thay đổi mật khẩu, ...
- Trang thanh toán: Cho phép người dùng thanh toán cho các mặt hàng nước,...
- Trang order dịch vụ
- Trang quản lý đơn hàng
- In hóa đơn

### Yêu Cầu

- Node.js
- MySQL
- React js

### Cài Đặt

1. Clone repository:
2. Di chuyển vào thư mục dự án:
3. Cài đặt dependencies:
   - npm install
5. Cấu hình cơ sở dữ liệu:
   - Đảm bảo bạn đã cấu hình kết nối với cơ sở dữ liệu trong tệp `config/db.js`.
   - Chạy script để tạo bảng:
6. Khởi động server:
   - npm start
