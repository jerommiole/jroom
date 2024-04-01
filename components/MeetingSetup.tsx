"use client";

import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-white">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/icon-jroom.svg"
          width={32}
          height={32}
          alt="Jroom Logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white">Jroom Setup</p>
      </Link>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            className="h-6 w-6 text-green-500 border-gray-300 rounded focus:ring-green-500"
          />{" "}
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <div className="flex gap-2">
        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();
            setIsSetupComplete(true);
          }}
        >
          Join Meeting
        </Button>
        <Link href="/">
          <Button className="rounded-md bg-dark-3 px-4 py-2.5">Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default MeetingSetup;
