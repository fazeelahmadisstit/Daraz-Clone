'use client'
export default function Footer(){
  return (
    <footer className="bg-white mt-8 border-t">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-2 text-sm space-y-1 text-gray-600">
            <li>About Daraz</li>
            <li>Careers</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Help</h4>
          <ul className="mt-2 text-sm space-y-1 text-gray-600">
            <li>Customer Care</li>
            <li>How to Buy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Policy</h4>
          <ul className="mt-2 text-sm space-y-1 text-gray-600">
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <div className="mt-2 text-sm text-gray-600">Social links here</div>
        </div>
      </div>
      <div className="bg-gray-50 py-4 text-center text-sm text-gray-500">© {new Date().getFullYear()}Jam Fazeel Ahmad</div>
    </footer>
  )
}
