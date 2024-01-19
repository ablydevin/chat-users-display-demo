"use client";

import { useEffect, useState } from "react";
import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";

export default function MemberList() {
  const [m, setM] = useState([]);

  const { isLoaded, organization, memberships, membership } = useOrganization();

  useEffect(() => {
    const l = async () => {
      if (organization) {
        const r = await organization.getMemberships();
        setM(r);
      }
    };
    l();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  return (
    <div>
      <div>Org Members</div>

      <div className="avatar-display">
        {m.map((members) => (
          <div className="avatar" key={members.id}>
            <div className="relative" key={members.publicUserData.userId}>
              <Image
                className="w-8 h-8 rounded"
                src={members.publicUserData.identifier + `.jpg`}
                alt=""
              />
              <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
            </div>
            <div className="font-medium dark:text-white">
              {members.publicUserData.identifier}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
