#![allow(clippy::not_unsafe_ptr_arg_deref)]

use std::ffi::{c_char, c_double, CString};

#[no_mangle]
pub extern "C" fn multiply(a: c_double, b: c_double) -> c_double {
    a * b
}

#[no_mangle]
pub extern "C" fn say_hello() -> *mut c_char {
    CString::new("Hello from Rust!").unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn free_string(s: *mut c_char) {
    unsafe {
        if s.is_null() {
            return;
        }

        let _ = CString::from_raw(s);
    };
}
