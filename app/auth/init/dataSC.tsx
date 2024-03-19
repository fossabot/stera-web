import { createDBServerClient } from "@/libs/db/createClient";
import "server-only";

// default means...
// In Stera server template, there are some services (ex: microblog, video, image, etc)
// Each services user data are based on Stera default user data.
// This profile can't be null or undefined.
// Make sure that user who doesn't init this information will redirected to this page. (ex: by middleware)

export async function updateInitData(
  defaultUsername: string,
  defaultBio: string
) {}

export async function getUserData() {
  const supabase = createDBServerClient();
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error: any) {
    // COMPROMISE ANY!!! using type ANY for error handling
    // return new Error(error)
  }
}
