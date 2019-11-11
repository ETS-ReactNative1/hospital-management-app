const VN = {
  SIGN_OUT: 'Đăng xuất',
  CONFIRM_SIGN_OUT_MESSAGE: 'Bạn có chắc chắn muốn đăng xuất khỏi tài khoản này?',
  GENERAL_INFO: 'Thông tin chung',
  EMAIL: 'Email',
  ROLE: 'Vai trò',
  EDIT: 'Chỉnh sửa',
  PERSONAL_INFO: 'Thông tin cá nhân',
  SURNAME: 'Họ và tên đệm',
  NAME: 'Tên',
  PHONE: 'Số điện thoại',
  CHANGE_PASSWORD: 'Đổi mật khẩu',
  SETUP: 'Cài đặt',
  USER: 'Người dùng',
  ADMIN: 'Quản lý',
  OWNER: 'Người sở hữu',

  SWITCH_DEVICE: 'Bật/Tắt thiết bị',
  SWITCH_DEVICE_DESC: 'Ghi nhận quá trình bật/tắt thiết bị',
  SEARCH_DEVICE: 'Tra cứu thiết bị',
  SEARCH_DEVICE_DESC: 'Tra cứu thông tin lich sử ghi nhận',
  MAINTAIN_DEVICE: 'Bảo trì thiết bị',
  MAINTAIN_DEVICE_DESC: 'Ghi nhận thông tin bảo trì',
  LIQUIDATE_DEVICE: 'Thanh lý thiết bị',
  LIQUIDATE_DEVICE_DESC: 'Ghi nhận thông tin thanh lý',
  ACCOUNT_DEVICE: 'Kiểm kể thiết bị',
  ACCOUNT_DEVICE_DESC: 'Ghi nhận kiểm kê thiết bị',

  DEVICE_INFO: 'Thông tin thiết bị',
  DEVICE_TITLE: 'Tên thiết bị',
  MODEL: 'Mẫu thiết bị',
  MANUFACTURER: 'Công ty sản xuất',
  ACTIVE_STATE: 'Trạng thái hoạt động',
  MANUFACTURED_YEAR: 'Năm sản xuất',
  ORIGIN: 'Xuất xứ',
  START_USE_TIME: 'Năm đưa vào sử dụng',
  START_USE_STATE: 'Trạng thái khi đưa vào sử dụng',
  ORIGINAL_PRICE: 'Giá thành ban đầu',
  CURRENT_PRICE: 'Giá thành hiện tại',
  FACULTY: 'Bộ phận',
  AVAILABILITY: 'Hiện trạng khả dụng',
  STATE_ON: 'Bật',
  STATE_OFF: 'Tắt',
  NEW: 'Mới',
  USED: 'Cũ',
  TURN_ON: 'Bật thiết bị',
  TURN_OFF: 'Tắt thiết bị',
  REPORT_STATE: 'Báo cáo lỗi trạng thái',
  ACTIVE_HISTORY: 'Lịch sử hoạt động',
  MAINTAIN_HISTORY: 'Lịch sử bảo trì',
  RECORD_START_MAINTAIN: 'Ghi nhận bắt đầu bảo trì',
  RECORD_END_MAINTAIN: 'Ghi nhận kết thúc bảo trì',
  MAINTAIN_COMPANY: 'Đơn vị bảo trì',
  ADDRESS: 'Địa chỉ',
  MAINTAIN_COST: 'Chi phí bảo trì',
  MAINTAIN_COST_EXPECT: 'Chi phí dự kiến',
  NOTE: 'Ghi chú',
  RECEIVER: 'Người nhận lại',
  UPDATE_MAINTAIN: 'Cập nhật bảo trì',
  LIQUIDATE_COMPANY: 'Đơn vị mua',
  LIQUIDATE_PRICE: 'Giá trị thanh lý',
  LIQUIDATE: 'Thanh lý',
  LIQUIDATE_INFO: 'Thông tin thanh lý',
  MAINTAIN_DONE: 'Đã hoàn thành',
  MAINTAIN_UNDONE: 'Chưa hoàn thành',
  MAINTAIN_INTERVAL: 'Thời gian bảo trì',
  ACTIVE: 'Đang hoạt động',
  MAINTAINING: 'Đang bảo trì',
  LIQUIDATED: 'Đã thanh lý',
  UNKNOWN: '(Không rõ)',

  SWITCH_OFF_MESSAGE:
    'Thiết bị đã được ghi nhận chuyển sang trạng thái Tắt. Hãy chắc chắn  rằng bạn đã tắt thiết bị!',
  SWITCH_ON_MESSAGE:
    'Thiết bị đã được ghi nhận chuyển sang trạng thái Bật. Hãy chắc chắn rằng bạn đã bật thiết bị!',
  REPORT_SWITCH_MESSAGE:
    'Bạn đang báo cáo một sai sót của hệ thống về trạng thái thiết bị. Hãy chắc chắn rằng trạng thái thiết bị thực tế là khác so với ghi nhận trên hệ thống!',
  REPORT_SWITCH_SUCCESS_MESSAGE:
    'Báo cáo của bạn về sai sót của trạng thái thiết bị đã được hệ thống ghi nhận.',
  REPORT_SUCCESS: 'Báo cáo thành công',
  TITLE: 'Tiêu đề',
  CONTINUE: 'Tiếp tục',
  CONFIRM: 'Xác nhận',
  CANCEL: 'Hủy bỏ',
  CHANGE_SUCCESS: 'Thay đổi thành công',
  DEVICE_MAINTAINING: 'Thiết bị đang được bảo trì',
  DEVICE_MAINTAINING_DESC:
    'Thiết bị này đang được bảo trì. Vui lòng thử lại khi thiết bị đã sẵn sàng.',
  DEVICE_LIQUIDATED: 'Thiết bị đã được thanh lý',
  DEVICE_LIQUIDATED_DESC:
    'Thiết bị này đã được bệnh viện thanh lý. Vui lòng thử lại với thiết bị khác.',
  SURE: 'Chắc chắn',
  CHANGE_PASSWORD_SUCCESSFUL_MESSAGE:
    'Mật khẩu của bạn đã được cập nhật thành công!\nĐể đảm bảo an toàn, bạn sẽ phải đăng nhập lại với mật khẩu mới.',
  PASSWORD: 'Mật khẩu',
  NEW_PASSWORD: 'Mật khẩu mới',
  OLD_PASSWORD: 'Mật khẩu cũ',
  CONFRIM_PASSWORD: 'Nhập lại mật khẩu mới',

  EMAIL_REQUIRED_ERROR: '^Email là bắt buộc',
  EMAIL_TOO_LONG_ERROR: '^Độ dài tối đa là 64 ký tự',
  PASSWORD_REQUIRED_ERROR: '^Mật khẩu là bắt buộc',
  PASSWORD_TOO_SHORT_ERROR: '^Độ dài tối thiểu là 6 ký tự',
  CONFRIM_PASSWORD_REQUIRED_ERROR: '^Xác nhận mật khẩu là bắt buộc',
  CONFRIM_PASSWORD_CONFLICT_ERROR: '^Mật khẩu xác nhận không trùng khớp',

  HISTORY_ACTIVITY: 'Lịch sử hoạt động',
  MAINTAIN_INFO: 'Thông tin bảo trì',
  COMPLETE: 'Hoàn tất',
  UPDATING: 'Đang cập nhật...',
  CHANGE_INFO: 'Thay đổi thông tin',

  CHANGE_INFO_SUCCESSFUL_MESSAGE: 'Thông tin của bạn đã được cập nhật thành công! ',
  EMAIL_IS_TAKEN_ERR_TITLE: 'Email đã được sử dụng',
  EMAIL_IS_TAKEN_ERR_MESSAGE:
    'Email đã được sử dụng để đăng kí cho một tài khoản khác. Xin vui lòng chọn một email khác',
  UNDEFINED_ERR_TITLE: 'Lỗi ứng dụng.',
  UNDEFINED_ERR_MESSAGE:
    'Thao tác của bạn không thể hoàn thành do một lỗi nào đó của ứng dụng. Chúng tôi rất tiếc vì điều đó',
  NO_INTERNET_ERR_TITLE: 'Lỗi kết nối',
  NO_INTERNET_ERR_MESSAGE: 'Không thể kết nối đến server. Hãy kiểm tra lại kết nối mạng của bạn.',
  SIGN_IN_ERR: 'Lỗi đăng nhâp',
  UNCONFIRMED_EMAIL_ERR: 'Tài khoản của bạn vẫn chưa được xác nhận.',
  INVALID_PASSWORD_ERR: 'Mật khẩu bạn đã nhập không chính xác.',
  INVALID_OLD_PASSWORD_ERR: 'Mật khẩu cũ bạn đã nhập không chính xác.',

  NO_DATA: 'Không có dữ liệu',
  NO_DATA_MESSAGE: 'Dữ liệu về lịch sử hoạt động của thiết bị hiện chưa khả dụng.',
  END_OF_LIST: 'Hết danh sách',
  CREATED_AT: 'Vào lúc',
  USED_TIME: 'Đã sử dụng'
};

export { VN };
