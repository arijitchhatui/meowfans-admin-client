// import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
// import { configService } from '@/util/config';
// import { buildSafeUrl } from '@/util/helpers';
// import { useEffect, useState } from 'react';

// interface Props {
//   creatorVaults: ExtendedUsersEntity[];
//   setCreatorVaults: React.Dispatch<React.SetStateAction<ExtendedUsersEntity[]>>;
// }

// export const Stream = ({ setCreatorVaults, creatorVaults }: Props) => {
//   const [eventSource, setEventSource] = useState<EventSource | null>(null);
//   const hasProcessing = creatorVaults.some((c) => c.processingObjectCount > 0);

//   const handleStream = () => {
//     if (!hasProcessing) return;

//     if (!eventSource) {
//       const es = new EventSource(buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/sse/download/stream' }));

//       es.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         console.log(data);
//         setCreatorVaults((prev) =>
//           prev.map((creator) =>
//             creator.id === data.creatorId
//               ? {
//                   ...creator,
//                   fulfilledObjectCount: data.status === 'FULFILLED' ? creator.fulfilledObjectCount + 1 : creator.fulfilledObjectCount,
//                   rejectedObjectCount: data.status === 'REJECTED' ? creator.rejectedObjectCount + 1 : creator.rejectedObjectCount,
//                   pendingObjectCount: data.status === 'PENDING' ? creator.pendingObjectCount + 1 : creator.pendingObjectCount,
//                   processingObjectCount: creator.processingObjectCount - 1
//                 }
//               : creator
//           )
//         );
//       };

//       setEventSource(es);
//     }
//   };

//   useEffect(() => {
//     handleStream();
//     return () => eventSource?.close();
//   }, [creatorVaults, hasProcessing]);
// };

// // import { ExtendedUsersEntity } from '@/packages/gql/generated/graphql';
// // import { configService } from '@/util/config';
// // import { buildSafeUrl } from '@/util/helpers';
// // import { useEffect, useRef } from 'react';

// // interface Props {
// //   creatorVaults: ExtendedUsersEntity[];
// //   setCreatorVaults: React.Dispatch<React.SetStateAction<ExtendedUsersEntity[]>>;
// // }

// // export const Stream = ({ setCreatorVaults, creatorVaults }: Props) => {
// //   const eventSourceRef = useRef<EventSource | null>(null);

// //   useEffect(() => {
// //     const hasProcessing = creatorVaults.some((c) => c.processingObjectCount > 0);

// //     if (hasProcessing && !eventSourceRef.current) {
// //       const es = new EventSource(buildSafeUrl({ host: configService.NEXT_PUBLIC_API_URL, pathname: '/sse/download/stream' }));

// //       es.onmessage = (event) => {
// //         const data = JSON.parse(event.data);
// //         console.log('SSE:', data);

// //         setCreatorVaults((prev) =>
// //           prev.map((creator) => {
// //             const isCreator =
// //               creator.id === data.creatorId
// //                 ? {
// //                     ...creator,
// //                     fulfilledObjectCount: data.status === 'FULFILLED' ? creator.fulfilledObjectCount + 1 : creator.fulfilledObjectCount,
// //                     rejectedObjectCount: data.status === 'REJECTED' ? creator.rejectedObjectCount + 1 : creator.rejectedObjectCount,
// //                     pendingObjectCount: data.status === 'PENDING' ? creator.pendingObjectCount + 1 : creator.pendingObjectCount,
// //                     processingObjectCount: creator.processingObjectCount - 1
// //                   }
// //                 : creator;
// //             console.log(isCreator);
// //             return isCreator;
// //           })
// //         );
// //       };

// //       es.onerror = () => {
// //         console.error('SSE error, closing stream');
// //         es.close();
// //         eventSourceRef.current = null;
// //       };

// //       eventSourceRef.current = es;
// //     }

// //     if (!hasProcessing && eventSourceRef.current) {
// //       eventSourceRef.current.close();
// //       eventSourceRef.current = null;
// //     }

// //     return () => {
// //       if (eventSourceRef.current) {
// //         eventSourceRef.current.close();
// //         eventSourceRef.current = null;
// //       }
// //     };
// //   }, [creatorVaults, setCreatorVaults]);

// //   return null;
// // };
