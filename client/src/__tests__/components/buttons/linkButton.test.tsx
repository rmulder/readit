import LinkButton from '../../../components/buttons/LinkButton.component';
import { mount } from 'enzyme';

describe('LinkButton Component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<LinkButton text='test' inverse={true} />);
    
    expect(wrapper.find('button')).toHaveLength(1);
  });
});
