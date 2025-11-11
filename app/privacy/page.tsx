import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Vault Launcher",
  description: "Privacy policy for Vault Launcher",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <p className="mb-3 text-primary">Last Updated: 11/10/2025</p>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            This Privacy Policy describes how Vault Launcher collects, uses, and
            protects your information when you use our desktop application.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Information We Collect
          </h2>

          <h3 className="text-xl font-medium mt-6 mb-3">
            Analytics and Error Tracking
          </h3>
          <p className="mb-4">
            We use PostHog to collect anonymous analytics data about how users
            interact with our desktop application. This includes usage patterns
            and interactions to help us improve our service.
          </p>
          <p className="mb-4">
            We use Sentry to collect error reports and performance data. This
            helps us identify and fix issues with our desktop application. Error
            reports may include technical information about your device and
            system.
          </p>

          <h3 className="text-xl font-medium mt-6 mb-3">Cookies</h3>
          <p className="mb-4">
            Our desktop application may collect data to enhance your experience
            and gather analytics through PostHog and Sentry.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>To improve our application and user experience</li>
            <li>To identify and fix technical issues</li>
            <li>To analyze usage patterns and trends</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing</h2>
          <p className="mb-6">
            We do not sell, trade, or otherwise transfer your personal
            information to third parties. Analytics and error data may be shared
            with PostHog and Sentry as part of their service provision.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
          <p className="mb-6">
            Analytics data is retained according to PostHog&apos;s retention
            policies. Error data is retained according to Sentry&apos;s
            retention policies.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about this Privacy Policy, please contact
            us
          </p>
        </div>
      </div>
    </div>
  );
}
