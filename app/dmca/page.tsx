import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA - Vault Launcher",
  description: "DMCA notice for Vault Launcher",
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">DMCA Notice</h1>
        <p className="mb-3 text-primary">Last Updated: 11/8/2025</p>
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-6">
            Vault Launcher does not host, store, or distribute any game files on
            our servers. We provide a platform that allows users to discover and
            download games from external sources, and no game files are stored
            on our infrastructure.
          </p>
          <p className="mb-6">
            We are committed to respecting the intellectual property rights of
            others and complying with the Digital Millennium Copyright Act
            (DMCA). If you believe that any content on our website infringes
            upon your copyright, please contact us immediately.
          </p>
          <p className="mb-6">
            To file a DMCA takedown notice, please provide the following
            information:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li>Your full legal name and contact information</li>
            <li>The copyrighted work that you claim has been infringed</li>
            <li>The location of the allegedly infringing material</li>
            <li>
              A statement that you have a good faith belief that the use is not
              authorized
            </li>
            <li>
              A statement made under penalty of perjury that the information is
              accurate
            </li>
            <li>Your electronic or physical signature</li>
          </ul>
          <p className="mb-6">
            Please send your DMCA notice to: dmca@parcoil.com
          </p>
          <p>
            We will respond to valid DMCA notices promptly and take appropriate
            action to remove or disable access to the allegedly infringing
            material.
          </p>
        </div>
      </div>
    </div>
  );
}
