const PAGE_SIZE = 3; 
const CURRENT_PAGE = 1 
const CONFIG_ACCESS_TOKEN = "ACCESS_TOKEN"

export {
    PAGE_SIZE,
    CURRENT_PAGE,
    CONFIG_ACCESS_TOKEN


};
export const NOTI_DELETE_COMPLETE = {
		group: 'noti',
		type: 'success',
		title: 'Thông Báo',
        duration: 2000,
		text: 'Đã xoá bài viết thành công',
};
export const NOTI_PROFILE_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Đã cập nhập thông tin cá nhân thành công',
};
export const PASS_C0NFIRM = {
    group: 'noti',
    type: 'success',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Đổi mật khẩu thành công',
};
export const PASS_ERROR_C0NFIRM = {
    group: 'noti',
    type: 'error',
    title: 'Có Lỗi',
    duration: 2000,
    text: 'Mật khẩu nhập lại không đúng',
};
export const PASS_ERROR = {
    group: 'noti',
    type: 'error',
    title: 'Có Lỗi',
    duration: 2000,
    text: 'Mật khẩu cũ không được trùng với mật khẩu mới',
};
export const PASS_TEXT = {
    group: 'noti',
    type: 'error',
    title: 'Có Lỗi',
    duration: 2000,
    text: 'Vui lòng nhập đầy đủ thông tin',
};
export const PASS_LOGIN = {
    group: 'noti',
    type: 'error',
    title: 'Có Lỗi',
    duration: 2000,
    text: 'Tài khoản hoặc mật khẩu không hợp lệ',
};
export const EDIT_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Cập nhật bài viết thành công',
};

export const EDIT_ERROR = {
    group: 'noti',
    type: 'error',
    title: 'có lỗi',
    duration: 2000,
    text: 'Vui lòng upload hình ảnh bài viết (Định dạng: jpg, png, gif, jpeg)',
};
export const EDIT_ERROR_COMPLETE = {
    group: 'noti',
    type: 'error',
    title: 'Có lỗi',
    duration: 2000,
    text: 'Vui lòng nhập đầy đủ nội dung, danh mục',
};
export const CHECK_FILE = {
    group: 'noti',
    type: 'error',
    title: 'Có lỗi',
    duration: 2000,
    text: 'File tải lên không đúng định dạng',
};
export const UPLOAD_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Đăng bài viết thành công',
};
export const SEARCH_WARNING = {
    group: 'noti',
    type: 'warn',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Vui lòng nhập nội dung Search...',
};
export const CMT_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Đăng bình luận thành công',
};
export const CMT_WARNING = {
    group: 'noti',
    type: 'warn',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Dữ liệu nhập vào không đúng quy tắc',
};
export const STATUS_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Thông Báo',
    duration: 2000,
    text: 'Cập nhật trạng thái User thành công!',
};
export const LOGIN_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Chào mừng',
    duration: 2000,
    text: 'Đăng nhập tài khoản thành công'
};
export const REGISTER_COMPLETE = {
    group: 'noti',
    type: 'success',
    title: 'Chúc mừng',
    duration: 2000,
    text: 'Bạn đã đăng ký tài khoản thành công'
};
export const REGISTER_ERORR = {
    group: 'noti',
    type: 'error',
    title: 'Có lỗi',
    duration: 2000,
    text: 'Email đăng ký đã tồn tại, vui lòng đăng ký email khác!'
};
export const MAIL_VERIFY = {
    group: 'noti',
    type: 'warn',
    title: 'Thông báo',
    duration: 2000,
    text: 'Vui lòng check Email để xác thực đăng ký tài khoản thành công!'
};