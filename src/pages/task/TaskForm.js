import { Form, Input, Radio, DatePicker, Col, AutoComplete } from 'antd';
import moment from 'moment';

const Option = AutoComplete.Option;
const FormItem = Form.Item;
const radioText = ['很重要-很紧急', '重要-不紧急', '不重要-紧急', '不重要-不紧急'];
const dateFormat = 'YYYY-MM-DD HH:mm';
const TaskForm = Form.create()(props => {
    const { taskC, form, handleSubmit, radioChecked, project, position, tag, onChange } = props;
    const {
        getFieldDecorator, getFieldError, isFieldTouched,
    } = form;
    const projectOption = project !== undefined ?
        project.map(project => <Option key={project.projectId}>{project.projectName}</Option>)
        : null;
    const positionOption = position !== undefined ?
        position.map(position => <Option key={position.positionId}>{position.positionName}</Option>)
        : null;
    const tagOption = tag !== undefined ?
        tag.map(tag => <Option key={tag.tagId}>{tag.tagName}</Option>)
        : null;
    const taskNameError = isFieldTouched('taskName') && getFieldError('taskName');
    let checked = taskC ? radioChecked === 0 ? taskC.level : radioChecked : radioChecked;
    return taskC ? (
        <Form onSubmit={handleSubmit}>
            <FormItem
                label={'任务名称'}
                validateStatus={taskNameError ? 'error' : 'success'}
            >
                {getFieldDecorator('taskName', {
                    rules: [{ required: true, message: 'Just Test' },],
                    initialValue: taskC.taskName,

                })(
                    <Input></Input>
                )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('level', {
                    initialValue: taskC.level,
                    getValueFromEvent: onChange,
                })(
                    <Radio.Group>
                        <Radio value={1}>{1 === checked ? radioText[0] : ''}</Radio>
                        <Radio value={2}>{2 === checked ? radioText[1] : ''}</Radio>
                        <Radio value={3}>{3 === checked ? radioText[2] : ''}</Radio>
                        <Radio value={4}>{4 === checked ? radioText[3] : ''}</Radio>
                    </Radio.Group>,
                )}
            </FormItem>
            <FormItem label={'时间'}>
                <Col span={11}>
                    <FormItem>
                        {getFieldDecorator('dateStart', {
                            initialValue: moment(new Date(taskC.dateStart)),
                        })(
                            <DatePicker
                                style={{ width: '100%' }}
                                showTime
                                format={dateFormat}>
                            </DatePicker>
                        )}
                    </FormItem>
                </Col>
                <Col span={2}>
                    <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
                        >
                    </span>
                </Col>
                <Col span={11}>
                    <FormItem>
                        {getFieldDecorator('dateEnd', {
                            initialValue: moment(new Date(taskC.dateEnd)),
                        })(
                            <DatePicker
                                style={{ width: '100%' }}
                                showTime
                                format={dateFormat}>
                            </DatePicker>
                        )}
                    </FormItem>
                </Col>
            </FormItem>
            <FormItem label={'项目名称'}>
                {getFieldDecorator('projectId', {
                    initialValue: taskC.projectId,
                })(
                    <AutoComplete placeholder='项目名称'>
                        {projectOption}
                    </AutoComplete>
                )}
            </FormItem>
            <FormItem label={'标签名称'}>
                {getFieldDecorator('tagId', {
                    initialValue: taskC.tagId,
                })(
                    <AutoComplete placeholder='标签名称'>
                        {tagOption}
                    </AutoComplete>
                )}
            </FormItem>
            <FormItem label={'位置名称'}>
                {getFieldDecorator('positionId', {
                    initialValue: taskC.positionId,
                })(
                    <AutoComplete placeholder='位置名称'>
                        {positionOption}
                    </AutoComplete>
                )}
            </FormItem>
        </Form>
    ) : null;
})

export default TaskForm;
