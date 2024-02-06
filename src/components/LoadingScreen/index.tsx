import styles from "./loadingScreen.module.scss"; // Update the import path based on your project structure

import Image from "next/image";

const LoadingScreen: React.FC<any> = (props) => {
  return (
    <div className={styles.loadingScreen}>
        <Image src="/logo.png" alt="Loading..." width={100} height={100} />
    </div>
  );
};

export default LoadingScreen;
