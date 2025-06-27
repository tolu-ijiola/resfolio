"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

/**
 * Define default settings as a single object.
 * This is what we compare against to see if changes were made.
 */
const DEFAULT_SETTINGS = {
  supportBanner: true,
  enableSignup: false,
  socialIntegrations: false,
  shopEnabled: false,
  sensitiveMaterial: false,
  seoMetadata: "",
  conversionTracking: false,
  facebookPixel: "",
  googleAnalytics: "",
};

export default function SettingsPage() {
  // Store settings in one object
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS });

  // Keep a reference to the initial (default) settings
  // so we can compare if the user has made changes.
  const defaultSettingsRef = useRef({ ...DEFAULT_SETTINGS });

  // Determine if user has changed anything
  const isDirty =
    JSON.stringify(settings) !== JSON.stringify(defaultSettingsRef.current);

  /**
   * Helper to update settings in one go.
   * key: The property to update (string)
   * value: The new value
   */
  function handleSettingChange<T extends keyof typeof settings>(
    key: T,
    value: typeof settings[T]
  ) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  /**
   * Save handler:
   * 1. You would typically call an API to persist the changes
   * 2. Once saved successfully, update defaultSettingsRef to new settings
   */
  function handleSaveChanges() {
    console.log("Saving new settings:", settings);

    // Simulate an API call, then mark these settings as the new default
    defaultSettingsRef.current = { ...settings };
    // Optionally show a success message, etc.
  }

  return (
    <main className="relative flex w-full flex-col gap-8 ">
      <div className="mb-2">
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-gray-500">
          Manage your Link / Page settings
        </p>
      </div>

      {/* Support Banner */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Support banner</CardTitle>
            <CardDescription className="text-sm">
              Show your support for important causes with a profile banner.
            </CardDescription>
          </div>
          <Switch
            checked={settings.supportBanner}
            onCheckedChange={(val) => handleSettingChange("supportBanner", val)}
          />
        </CardHeader>
        <CardContent>
          {settings.supportBanner && (
            <p className="text-sm text-gray-500">
              Enabling a support banner allows visitors to see a pinned message.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Mailing List Integrations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Mailing list integrations</CardTitle>
          <CardDescription className="text-sm">
            Add a sign-up field so visitors can join your mailing list.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="mailing-list-switch" className="text-sm font-medium">
              Enable sign-up
            </Label>
            <Switch
              id="mailing-list-switch"
              checked={settings.enableSignup}
              onCheckedChange={(val) => handleSettingChange("enableSignup", val)}
            />
          </div>
          {settings.enableSignup && (
            <div className="space-y-2">
              <Label
                htmlFor="mailing-list-provider"
                className="text-sm font-medium"
              >
                Mailing List Provider (e.g., Mailchimp)
              </Label>
              <Input
                id="mailing-list-provider"
                placeholder="Enter your provider or API key..."
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Integrations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Social integrations</CardTitle>
          <CardDescription className="text-sm">
            Connect your social accounts directly to your page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="social-switch" className="text-sm font-medium">
            Enable social links
          </Label>
          <Switch
            id="social-switch"
            checked={settings.socialIntegrations}
            onCheckedChange={(val) =>
              handleSettingChange("socialIntegrations", val)
            }
          />
        </CardContent>
      </Card>

      {/* Shop */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Shop</CardTitle>
          <CardDescription className="text-sm">
            Enable and manage your shop display and preview.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="shop-switch" className="text-sm font-medium">
            Enable your shop
          </Label>
          <Switch
            id="shop-switch"
            checked={settings.shopEnabled}
            onCheckedChange={(val) => handleSettingChange("shopEnabled", val)}
          />
        </CardContent>
      </Card>

      {/* Sensitive Material */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Sensitive material</CardTitle>
          <CardDescription className="text-sm">
            Add a content warning before visitors can view your page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="sensitive-switch" className="text-sm font-medium">
            Content warning
          </Label>
          <Switch
            id="sensitive-switch"
            checked={settings.sensitiveMaterial}
            onCheckedChange={(val) =>
              handleSettingChange("sensitiveMaterial", val)
            }
          />
        </CardContent>
      </Card>

      {/* SEO */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>SEO</CardTitle>
          <CardDescription className="text-sm">
            Configure how your page appears on search engines.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="seo-metadata" className="text-sm font-medium">
            SEO metadata
          </Label>
          <Textarea
            id="seo-metadata"
            placeholder="Enter meta description, keywords, etc."
            value={settings.seoMetadata}
            onChange={(e) => handleSettingChange("seoMetadata", e.target.value)}
            className="bg-white/5 text-white placeholder:text-gray-500"
          />
          <p className="text-xs text-gray-500">
            May take some time to reflect on search engines.
          </p>
        </CardContent>
      </Card>

      {/* Conversion Tracking */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <CardTitle>Conversion tracking</CardTitle>
            <span className="rounded-md bg-yellow-500 px-2 py-1 text-xs text-black">
              Beta
            </span>
          </div>
          <CardDescription className="text-sm">
            Track user actions after clicking your link.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Label htmlFor="conversion-switch" className="text-sm font-medium">
            Enable conversion tracking
          </Label>
          <Switch
            id="conversion-switch"
            checked={settings.conversionTracking}
            onCheckedChange={(val) =>
              handleSettingChange("conversionTracking", val)
            }
          />
        </CardContent>
      </Card>

      {/* Analytics Integrations */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Analytics integrations</CardTitle>
          <CardDescription className="text-sm">
            Connect to your analytics platforms for deeper insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Facebook Pixel */}
          <div>
            <Label htmlFor="facebook-pixel" className="mb-1 block text-sm font-medium">
              Facebook
            </Label>
            <Input
              id="facebook-pixel"
              placeholder="Enter your Pixel ID..."
              value={settings.facebookPixel}
              onChange={(e) =>
                handleSettingChange("facebookPixel", e.target.value)
              }
            />
          </div>

          {/* Google Analytics */}
          <div>
            <Label htmlFor="google-analytics" className="mb-1 block text-sm font-medium">
              Google
            </Label>
            <Input
              id="google-analytics"
              placeholder="Enter your Analytics ID..."
              value={settings.googleAnalytics}
              onChange={(e) =>
                handleSettingChange("googleAnalytics", e.target.value)
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Only show "Save changes" button if user made changes */}
      {isDirty && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            className="bg-teal-600 hover:bg-teal-500"
            onClick={handleSaveChanges}
          >
            Save changes
          </Button>
        </div>
      )}
    </main>
  );
}
