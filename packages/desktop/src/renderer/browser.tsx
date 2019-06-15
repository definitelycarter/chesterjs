import { resolveFiles, Folder } from '@chester/chester';
import { Config } from '@chester/config';
import { Browser as BrowserComponent } from '@chester/ui';
import React, { useEffect, useState } from 'react';
interface BrowserProps {
  config: Config;
}
export function Browser(props: BrowserProps) {
  const [folder, setFolder] = useState<Folder>();

  useEffect(() => {
    async function load() {
      const root = await resolveFiles(props.config);
      setFolder(root);
    }
    load();
  }, [props.config]);

  if (!folder) return null;
  return <BrowserComponent folder={folder} />;
}
