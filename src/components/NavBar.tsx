import Image from 'next/image';

const NavBar = () => {
    return (
        <nav className="fixed top-0 left-0 z-50 flex w-screen items-center justify-between p-3 md:p-9">
            <Image src="/images/nav-logo.svg" alt="nav-logo" width={100} height={100} className="w-20 md:w-24" />
            <div className="rounded-full bg-white px-8 py-2 lg:px-16 lg:py-4">
                <p className="text-lg font-bold uppercase lg:text-xl">find in stores</p>
            </div>
        </nav>
    );
};

export default NavBar;
