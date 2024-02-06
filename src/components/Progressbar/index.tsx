import styles from "@/styles/Progressbar.module.scss"; // Update the import path based on your project structure

interface ProgressBarProps {
  progress?: number;
  length?: number;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  return (
    <div
      style={
        props.progress && props.length
          ? { width: `${(props.progress * 100) / (props.length - 1)}%` }
          : props.length
          ? { width: `${(0.05 * 100) / (props?.length - 1)}%` }
          : { width: `${(0.05 * 100) / (8 - 1)}%` }
      }
      className={styles.progressBar}
    ></div>
  );
};

export default ProgressBar;
