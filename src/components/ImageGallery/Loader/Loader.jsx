import { MagnifyingGlass } from 'react-loader-spinner';
import css from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={css.Loader_container}>
      <MagnifyingGlass
        visible={true}
        height="160"
        width="160"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor="#efefef"
        color="#3f51b5"
      />
    </div>
  );
};
