import { Network } from "./Network"

export default class Apis {

    static app_setting = () => {
        return Network('post', 'get-app-setting')
    }

    static static_page = (data) => {
        return Network('post', 'get-static-pages', data)
    }

    static product_category = () => {
        return Network('post', 'get-product-category')
    }

    static member_type = () => {
        return Network('post', 'get-member-type')
    }

    static company_details = (data) => {
        return Network('post', 'get-company-details', data)
    }

    static sign_up = (data) => {
        return Network('post', 'signup', data)
    }

    static signup_otpresend = (data) => {
        return Network('post', 'signup-otp-resend', data)
    }

    static signup_otpvalidate = (data) => {
        return Network('post', 'signup-otp-verify', data)
    }

    static forgot_password = (data) => {
        return Network('post', 'forgot-password', data)
    }

    static validate_otp = (data) => {
        return Network('post', 'validate-otp', data)
    }

    static resend_otp = (data) => {
        return Network('post', 'resend-otp', data)
    }

    static reset_password = (data) => {
        return Network('post', 'reset-password', data)
    }

    static sign_in = (data) => {
        return Network('post', 'signin', data)
    }

    static signin_mobile = (data) => {
        return Network('post', 'signin-with-mobile', data)
    }

    static signin_mobile_otpvalidate = (data) => {
        return Network('post', 'signin-validate-mobile', data)
    }

    static sign_out = () => {
        return Network('post', 'signout')
    }

    static delete_acnt = () => {
        return Network('post', 'delete-account')
    }

    static change_password = (data) => {
        return Network('post', 'change-password', data)
    }

    static get_profile = () => {
        return Network('post', 'get-profile')
    }

    static update_profile = (data) => {
        return Network('post', 'update-profile', data)
    }

    static plant_dashboard = () => {
        return Network('post', 'dashboard')
    }

    static get_product = () => {
        return Network('post', 'get-product')
    }

    static get_units = () => {
        return Network('post', 'get-units')
    }

    static plant_addrequest = (data) => {
        return Network('post', 'process-request-add', data)
    }

    static process_request_list = (data) => {
        return Network('post', 'process-request-list', data)
    }

    static plant_delete_request = (data) => {
        return Network('post', 'process-request-delete', data)
    }

    static process_request_edit = (data) => {
        return Network('post', 'process-request-edit', data)
    }

    static process_request_update = (data) => {
        return Network('post', 'process-request-update', data)
    }

    static get_notification = (data) => {
        return Network('post', 'get-notifications', data)
    }

    static complete_request_list = (data) => {
        return Network('post', 'completed-request-list', data)
    }

    static reject_request_list = (data) => {
        return Network('post', 'rejected-request-list', data)
    }
}