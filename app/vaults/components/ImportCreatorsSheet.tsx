'use client';
import { LoadingButton } from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { CreatorContext } from '@/hooks/context/CreatorContextWrapper';
import { HostNames } from '@/lib/constants';
import { INITIATE_CREATORS_IMPORT_QUERY_MUTATION } from '@/packages/gql/api/importAPI';
import { DocumentQualityType, FileType, ImportTypes } from '@/packages/gql/generated/graphql';
import { useMutation } from '@apollo/client/react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ImportCreatorsSheet = () => {
  const [user] = useContext(CreatorContext);
  const [url, setUrl] = useState<string>('');
  const [start, setStart] = useState<number>(0);
  const [exclude, setExclude] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [exceptions, setExceptions] = useState<string[]>([]);
  const [totalContent, setTotalContent] = useState<number>(0);
  const [subDirectory, setSubDirectory] = useState<string>('');
  const [isNewCreator, setIsNewCreator] = useState<boolean>(false);
  const [exceptionInput, setExceptionInput] = useState<string>('');
  const [fileType, setFileType] = useState<FileType>(FileType.Image);
  const [hasEditedSubDir, setHasEditedSubDir] = useState<boolean>(false);
  const [importType, setImportType] = useState<ImportTypes>(ImportTypes.Page);
  const [initiateImport] = useMutation(INITIATE_CREATORS_IMPORT_QUERY_MUTATION);
  const [qualityType, setQualityType] = useState<DocumentQualityType>(DocumentQualityType.HighDefinition);

  const handleInitiate = async () => {
    setLoading(true);
    try {
      await initiateImport({
        variables: {
          input: {
            creatorId: user.getCreatorProfile.creatorId,
            url: url.trim(),
            fileType,
            qualityType,
            totalContent,
            subDirectory: subDirectory.trim(),
            exclude,
            importType,
            start,
            exceptions,
            isNewCreator
          }
        }
      });
      toast.success('Job added, come back after a while');
    } catch (error) {
      console.log(error);
      toast.error('Something wrong happened!');
    } finally {
      handleClose();
    }
  };

  const handleAddException = () => {
    if (exceptionInput.trim() !== '') {
      setExceptions([...exceptions, exceptionInput.trim()]);
      setExceptionInput('');
    }
  };

  const handleClose = () => {
    setLoading(false);
    setUrl('');
    setFileType(FileType.Image);
    setQualityType(DocumentQualityType.HighDefinition);
    setTotalContent(0);
    setSubDirectory('');
    setImportType(ImportTypes.Page);
    setHasEditedSubDir(false);
    setStart(0);
    setExclude(0);
    setIsNewCreator(false);
    setExceptions([]);
  };

  useEffect(() => {
    if (!hasEditedSubDir && url) {
      const parts = url.split('/').filter(Boolean);
      setSubDirectory(parts.at(-1) ?? '');
    }
  }, [url, hasEditedSubDir]);

  useEffect(() => {
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    if (url.length && regex.test(url)) {
      if (new URL(url).hostname === HostNames.WALLHAVEN) {
        setQualityType(DocumentQualityType.LowDefinition);
        setImportType(ImportTypes.Branch);
      }
    }
  }, [url]);

  return (
    <Sheet onOpenChange={handleClose}>
      <SheetTrigger asChild>
        <Button variant="outline">Import</Button>
      </SheetTrigger>
      <SheetContent className="p-1">
        <SheetHeader>
          <SheetTitle>Add new contents {user && ' ✅🚀'}</SheetTitle>
          <SheetDescription>Be descriptive about site information</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 space-y-1">
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="site-url"
              type="url"
              placeholder="https://meow@example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-row gap-3 space-y-1">
            <div className="grid gap-2">
              <Label htmlFor="subDirectory">Subdirectory</Label>
              <Input
                id="subDirectory"
                type="text"
                placeholder="chris"
                required
                autoComplete="subDirectory"
                value={subDirectory}
                onChange={(e) => {
                  setSubDirectory(e.target.value);
                  setHasEditedSubDir(e.target.value.trim() !== '');
                }}
              />
            </div>
            <div className="flex flex-col gap-1 space-y-1 items-center content-center">
              <Label htmlFor="newUser" className="text-xs">
                NewCreator
              </Label>
              <Switch
                checked={isNewCreator}
                onCheckedChange={(checked) => {
                  setIsNewCreator(checked);
                  setImportType(ImportTypes.Profile);
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 space-x-2">
            <div className="grid gap-2">
              <Label htmlFor="start">Start</Label>
              <Input
                id="start"
                type="text"
                placeholder="0"
                required
                value={start}
                onChange={(e) => setStart(Number(e.target.value.replace(/[^0-9]/g, '')))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="exclude">Exclude</Label>
              <Input
                id="exclude"
                type="text"
                placeholder="0"
                required
                value={exclude}
                onChange={(e) => setExclude(Number(e.target.value.replace(/[^0-9]/g, '')))}
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <div className="grid grid-cols-2 space-x-1">
              <div className="grid gap-2">
                <Label htmlFor="quality-type">Quality type</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{qualityType.replace(/_/g, ' ')}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36">
                    <DropdownMenuLabel>Quality types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={qualityType} onValueChange={(val) => setQualityType(val as DocumentQualityType)}>
                      <DropdownMenuRadioItem className="text-xs" value={DocumentQualityType.HighDefinition}>
                        High
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem className="text-xs" value={DocumentQualityType.LowDefinition}>
                        Low
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem className="text-xs" value={DocumentQualityType.DefaultDefinition}>
                        Default
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="file-type">File type</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{fileType.replace(/_/g, ' ')}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-36">
                    <DropdownMenuLabel>File types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={fileType} onValueChange={(val) => setFileType(val as FileType)}>
                      <DropdownMenuRadioItem value={FileType.Image}>Image</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={FileType.Video}>Video</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={FileType.Document}>Document</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={FileType.Audio}>Audio</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="features">Exceptions</Label>
              <div className="flex gap-2">
                <Input
                  value={exceptionInput}
                  onChange={(e) => setExceptionInput(e.target.value)}
                  placeholder="Add exceptions"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddException();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddException}>
                  Add
                </Button>
              </div>
            </div>
            <ul className="flex flex-row pl-2 text-xs space-x-1">
              {exceptions.map((f, i) => (
                <li key={i} className="cursor-pointer" onClick={() => setExceptions((prev) => prev.filter((feature) => f !== feature))}>
                  {i + 1}.{f}
                </li>
              ))}
            </ul>

            <div className="grid gap-2">
              <Label htmlFor="import-type">Import type</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">{importType.replace(/_/g, ' ')}</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Import types</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={importType} onValueChange={(val) => setImportType(val as ImportTypes)}>
                    <DropdownMenuRadioItem value={ImportTypes.Page}>Page</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={ImportTypes.Profile}>Profile</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={ImportTypes.Branch}>Branch</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value={ImportTypes.Single}>Single</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <SheetFooter>
          <LoadingButton title="Submit" onClick={handleInitiate} disabled={!url} loading={loading} />
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
