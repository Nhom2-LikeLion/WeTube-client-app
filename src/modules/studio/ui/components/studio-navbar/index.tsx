import { SidebarTrigger } from '@/components/ui/sidebar';
import { pageUrls } from '@/lib/enums/page-urls';
import Image from 'next/image';
import Link from 'next/link';
import StudioUploadModal from '../studio-upload-modal';
import AuthButton from '@/modules/auth/ui/components/auth-button';

export default function StudioNavbar() {
    return (
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-sm">
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center flex-shrink-0">
            <SidebarTrigger />
            <Link
              prefetch
              href={pageUrls.STUDIO}
              className="hidden md:block"
            >
              <div className="flex items-center p-4 gap-1">
                <Image
                  src="/assets/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                />
                <p className="text-xl font-semibold tracking-tight">Studio</p>
              </div>
            </Link>
          </div>

          <div className="flex-1"></div>

          <div className="flex-shrink-0 items-center flex gap-4">
            <StudioUploadModal />
            {/* <AuthButton /> */}
            Auth button
          </div>
        </div>
      </nav>
    );
}