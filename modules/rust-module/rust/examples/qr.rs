use fast_qr::convert::{Builder, Shape};
use fast_qr::convert::svg::SvgBuilder;
use fast_qr::qr::QRBuilder;

fn main() {
    let qrcode = QRBuilder::new("https://example.com/")
        .build()
        .unwrap();

    let _svg = SvgBuilder::default()
        .shape(Shape::Circle)
        .to_str(&qrcode);

    println!("{:?}", _svg);
}
