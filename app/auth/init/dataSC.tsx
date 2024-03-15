"use server";

// default means...
// In Stera server template, there are some services (ex: microblog, video, image, etc)
// Each services user data are based on Stera default user data.
// This profile can't be null or undefined.
// Make sure that user who doesn't init this information will redirected to this page. (ex: by middleware)

export async function userData(defaultUsername: string, defaultBio: string) {}
