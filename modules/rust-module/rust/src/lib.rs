#![allow(clippy::not_unsafe_ptr_arg_deref)]

use fast_qr::convert::svg::SvgBuilder;
use fast_qr::convert::{Builder, Shape};
use fast_qr::QRBuilder;
use std::ffi::{c_char, c_double, CStr, CString};

#[no_mangle]
pub extern "C" fn generate_qr(s: *const c_char) -> *mut c_char {
    // todo: handle error
    let s = unsafe {
        CStr::from_ptr(s)
    }.to_str().unwrap();

    let qrcode = QRBuilder::new(s)
        .build()
        .unwrap();

    // todo: pass colors/shape from React Native side?
    let svg_str = SvgBuilder::default()
        .background_color("#ffffff00")
        .shape_color(Shape::Circle, "#ffffffff")
        .to_str(&qrcode);

    CString::new(svg_str).unwrap().into_raw()
}

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
    if s.is_null() {
        return;
    }

    drop(unsafe { CString::from_raw(s) });
}
