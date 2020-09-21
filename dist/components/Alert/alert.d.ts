import { FC } from 'react';
export declare type AlertType = 'default' | 'success' | 'danger' | 'warning';
interface AlertProps {
    /**标题 */
    title: string;
    /**描述 */
    description?: string;
    /**类型 四种可选 */
    type: AlertType;
    /**关闭Alert时触发的事件 */
    onClose?: () => void;
    /**是否显示关闭图标 */
    closable?: boolean;
}
export declare const Alert: FC<AlertProps>;
export default Alert;
