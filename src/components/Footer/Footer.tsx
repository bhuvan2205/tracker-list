function Footer() {
  return (
    <footer className="bg-gray-100 py-6">
      <div className="container mx-auto text-center text-gray-600">
        <p>
          &copy; {new Date().getFullYear()} Tracker App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
