import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth"; // Importing the User type
import { auth } from "@/libs/firebase";
import { useRouter } from "expo-router";

interface UseAuthReturn {
  user: User | null;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null); // Specify type as User | null
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push("/singin");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { user };
};
