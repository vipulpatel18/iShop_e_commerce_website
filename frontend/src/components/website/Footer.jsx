import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-5">
      <div className="max-w-[1200px]  m-auto px-6">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between text-gray-600 mb-8 space-y-6 lg:space-y-0">
          {/* About Section */}
          <div className="w-full md:w-1/3 pe-20">
            <h3 className="text-2xl font-bold mb-4">iSHOP</h3>
            <p className="text-sm">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer...
            </p>
          </div>

          {/* Social Media Links */}
          <div className="w-full md:w-1/3 pe-20">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <p className="text-sm mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 pe-20">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">
              iShop: address #building 124 <br />
              Call us now: 0123-456-789 <br />
              Email: support@whatever.com
            </p>
          </div>
        </div>

        {/* Bottom Links Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-gray-600 text-sm border-t border-gray-300 pt-6">
          <div>
            <h4 className="font-bold mb-3">Information</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Service</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Extras</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">My Account</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Useful Links</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Our Offers</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-600">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Information
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="flex justify-end">
          <div className="w-1/3  flex justify-center mt-6">
            <img
              src="img/Paypal.svg"
              alt="Payment Methods"
              className="w-1/2 h-8 object-contain"
            />
            <img
              src="img/master_card.svg"
              alt="Payment Methods"
              className="w-1/2 h-8 object-contain"
            />
            <img
              src="img/visa.svg"
              alt="Payment Methods"
              className="w-1/2 h-8 object-contain"
            />
            <img
              src="img/Western_union.svg"
              alt="Payment Methods"
              className="w-1/2 h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
