// ProfileImageModal.tsx

import React from 'react'
import Image from 'next/image'
import { Button } from '@tremor/react'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface ProfileImageModalProps {
  src: string | StaticImport
  alt: string
  onClose: () => void
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ src, alt, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div className="relative bg-white p-4">
        {/* Close Button */}
        <Button
          className="absolute right-0 top-0 m-2 text-xl font-semibold text-white"
          onClick={onClose}
          color="red"
          tooltip="Close"
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
