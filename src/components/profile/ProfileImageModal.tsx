import React from 'react'
import Image from 'next/image'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Button } from '@/components/ui/button'

interface ProfileImageModalProps {
  src: string | StaticImport
  alt: string
  onClose: () => void
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-slate-1000 relative rounded p-4">
        {/* Close Button */}
        <Button
          className="font-shadbold absolute right-0 top-0 m-2 rounded border border-indigo-600 bg-indigo-600 bg-opacity-0 text-xl text-white hover:bg-slate-400 hover:text-black focus:outline-none"
          onClick={onClose}
          // tooltip="Close"
        >
          X
        </Button>

        {/* Image */}
        <Image src={src} alt={alt} width={500} height={500} className="rounded" />
      </div>
    </div>
  )
}

export default ProfileImageModal
