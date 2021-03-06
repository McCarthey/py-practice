/**
如何用css/js实现多行文本溢出省略号的效果，考虑兼容性
 */
 /**
 css:
 单行：
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
多行：
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; //行数
    overflow: hidden;
兼容：
    p {
        position: relative; 
        line-height: 20px; 
        max-height: 40px;
        overflow: hidden;
    }
    p::after{
        content: "..."; 
        position: absolute;
        bottom: 0;
        right: 0; 
        padding-left: 40px;
        background: -webkit-linear-gradient(left, transparent, #fff 55%);
        background: -o-linear-gradient(right, transparent, #fff 55%);
        background: -moz-linear-gradient(right, transparent, #fff 55%);
        background: linear-gradient(to right, transparent, #fff 55%);
    }
*/