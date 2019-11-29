::windows批处理首秀：批量打开网页 配合油猴使用
@echo off
for /l %%i in (120,1,158) do start https://gitlab.nk8s.cn/groups/test%%i/-/edit
pause