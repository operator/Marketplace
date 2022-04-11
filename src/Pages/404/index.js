import PageLayout from '../../Layout/Page';
import { MdSearchOff } from 'react-icons/md'

const NotFound = () => {
  return <PageLayout>
    <div className="d-flex align-items-center flex-column fs-4 justify-content-center my-auto mt-5">
      <p className="mb-1">Page not found!</p>
      <MdSearchOff size={48} />
    </div>
  </PageLayout>
};

export default NotFound;
