"use client";

import { useEffect, useState } from "react";
import { useClerk, useOrganizationList } from "@clerk/nextjs";

export default function OrganizationList() {
  const clerk = useClerk();

  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const organizationChanged = (event) => {
    console.log(`Setting org active: ${event.target.value}`);
    setActive({ organization: event.target.value });
  };

  if (!isLoaded) {
    return <>Loading</>;
  }

  return (
    <div>
      <div>
        <select onChange={organizationChanged}>
          <option value="foo" key="foo">Foo</option>
          {userMemberships.data?.map((organizationMembership) => (
            <option
              value={organizationMembership.organization.id}
              key={organizationMembership.id}
            >
              {organizationMembership.organization.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          className="button-blue"
          disabled={!userMemberships.hasNextPage}
          onClick={() => userMemberships.fetchNext()}
        >
          Load more
        </button>
      </div>
    </div>
  );
}
