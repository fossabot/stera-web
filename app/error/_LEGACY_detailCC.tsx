// "use client";

// import i18nDictionaries from "@/i18n/interface";
// import { Textarea } from "@mantine/core";
// import { useEffect, useState } from "react";

// export function ErrorDetailComponent({ dict }: { dict: i18nDictionaries }) {
//   const [errorDetail, setErrorDetail] = useState("Loading...");
//   useEffect(() => {
//     const ssdetail = window.sessionStorage.getItem("error");
//     setErrorDetail(ssdetail ?? dict.error.page.noDescription);
//   }, []);
//   return (
//     <Textarea w="70%" label="Error detail" maw="600px" readOnly value={errorDetail} />
//   );
// }
