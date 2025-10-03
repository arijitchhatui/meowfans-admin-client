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
import { HostNames } from '@/lib/constants';
import { INITIATE_CREATOR_OBJECTS_IMPORT_MUTATION } from '@/packages/gql/api/importAPI';
import { GET_USER_QUERY } from '@/packages/gql/api/userAPI';
import { DocumentQualityType, FileType, GetUserQuery, ImportTypes } from '@/packages/gql/generated/graphql';
import { useLazyQuery, useMutation } from '@apollo/client/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ImportSingleCreatorSheet = () => {
  const { username } = useParams();
  const [url, setUrl] = useState<string>('');
  const [start, setStart] = useState<number>(0);
  const [getUser] = useLazyQuery(GET_USER_QUERY);
  const [exclude, setExclude] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [creator, setCreator] = useState<GetUserQuery>();
  const [loading, setLoading] = useState<boolean>(false);
  const [exceptions, setExceptions] = useState<string[]>([]);
  const [totalContent, setTotalContent] = useState<number>(0);
  const [subDirectory, setSubDirectory] = useState<string>('');
  const [exceptionInput, setExceptionInput] = useState<string>('');
  const [fileType, setFileType] = useState<FileType>(FileType.Image);
  const [hasEditedSubDir, setHasEditedSubDir] = useState<boolean>(false);
  const [importType, setImportType] = useState<ImportTypes>(ImportTypes.Profile);
  const [initiateImport] = useMutation(INITIATE_CREATOR_OBJECTS_IMPORT_MUTATION);
  const [qualityType, setQualityType] = useState<DocumentQualityType>(DocumentQualityType.HighDefinition);

  const handleGetUser = async () => {
    if (username) {
      const { data } = await getUser({ variables: { username: username as string } });
      setCreator(data);
    } else setCreator(undefined);
  };

  const handleInitiate = async () => {
    setLoading(true);
    try {
      if (!creator?.getUser.id) return;
      await initiateImport({
        variables: {
          input: {
            creatorId: creator?.getUser.id,
            url: url.trim(),
            fileType,
            qualityType,
            totalContent,
            subDirectory: subDirectory.trim(),
            exclude,
            importType,
            start,
            exceptions
          }
        }
      });
      toast.success('Job added, come back after a while');
    } catch {
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
    setImportType(ImportTypes.Profile);
    setHasEditedSubDir(false);
    setStart(0);
    setExclude(0);
    setExceptions([]);
    setIsOpen((prev) => !prev);
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

  useEffect(() => {
    handleGetUser();
  }, [username]); //eslint-disable-line

  return (
    <Sheet onOpenChange={handleClose} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Import</Button>
      </SheetTrigger>
      <SheetContent className="p-1">
        <SheetHeader>
          <SheetTitle>Add new contents to {creator && creator?.getUser.username.toUpperCase()}</SheetTitle>
          <SheetDescription>
            {creator ? `You are importing to ${creator.getUser.username}` : 'Be descriptive about site information'}
          </SheetDescription>
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
            <div className="grid grid-cols-2 space-x-2">
              <div className="grid gap-2">
                <Label htmlFor="quality-type">Quality type</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{qualityType.replace(/_/g, ' ')}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Quality types</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={qualityType} onValueChange={(val) => setQualityType(val as DocumentQualityType)}>
                      <DropdownMenuRadioItem value={DocumentQualityType.HighDefinition}>High</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={DocumentQualityType.LowDefinition}>Low</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={DocumentQualityType.DivDefinition}>Div</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value={DocumentQualityType.DefaultDefinition}>Default</DropdownMenuRadioItem>
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
                  <DropdownMenuContent className="w-56">
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
                    {!creator && <DropdownMenuRadioItem value={ImportTypes.Page}>Page</DropdownMenuRadioItem>}
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
