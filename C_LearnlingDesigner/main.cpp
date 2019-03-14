#include<cstdio>
#include<iostream>
#include<cstring>
#include<sstream>
#include <queue>
#define Read()  freopen("in.in", "r", stdin);
#define Write() freopen("out.out", "w", stdout);
using namespace std;
using namespace std;


string Int_to_String(int n)
{
ostringstream stream;
stream<<n;  //n为int类型
return stream.str();
}

int maze[7][7], pre[30], vis[30];
int dir[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};

bool isLeagal ( int r, int c )
{
    if ( r < 0 || c < 0 || r > 4 || c > 4 )
        return false;
    if ( maze[r][c] == 1 )
        return false;
    return true;
}
string tmpchar = "";
void print ( int des )
{
    if ( pre[des] != -1 )
        print ( pre[des] );
    tmpchar +="(";
    tmpchar += Int_to_String(des/5);
    tmpchar += ",";
    tmpchar += Int_to_String(des % 5);
    tmpchar +=") ";

    cout << '(' << des / 5 << ", " << des % 5 << ')' << " ";
}
int stx,sty,ex,ey;
void bfs ()
{
    queue<int> que;
    memset(vis,0,sizeof(vis));

    pre[stx * 5 + sty] = -1;
    vis[0] = true;
    que.push ( 0 );

    int now, next;
    int r, c, tr, tc;

    while ( ! que.empty () )
    {
        now = que.front(); // 取出来队列头元素
        que.pop();
        r = now / 5;
        c = now % 5;

        for ( int i = 0; i < 4; i++ )
        {
            tr = r + dir[i][0]; //遍历4个方向
            tc = c + dir[i][1];
            next = tr * 5 + tc;
            if ( isLeagal ( tr, tc ) && !vis[next] ) //如果坐标合法，并且没有被标记过
            {
                pre[next] = now;
                if(maze[tr][tc] == 3) return ; //终点返回
               // if ( next == 24 ) return;
                vis[next] = true;
                que.push(next);
            }
        }
    }
}


//保存
void saveList(){

    FILE *pfw;
    pfw=fopen("out.out","w");
    if (pfw==NULL)
    {
        printf("文件操作失败");
        return ;
       // return;
    }

    fprintf(pfw,"%s",tmpchar.c_str());
    fclose(pfw);
    printf("文件保存成功\n");

}


void readFile(){ //读取文件

    FILE *pfr;
    printf("请输入要读取的文件名,加上后缀,例如in.in\n");

    char name[40];
    scanf("%s",name);

    pfr = fopen(name,"r");

    if (pfr == NULL)
    {
        printf("文件操作失败");
        return ;
    }
    else
    {

        int cnt = 0;
        while (!feof(pfr))
        {
            char str[256] = {0};
            fgets(str, 256, pfr);          //动态  遍历文件
            if(strcmp(str,"") == 0){
                break;
            }
            cout<<str<<endl;
            string tmp = str;
            for(int i=0;i<tmp.length();i++){ //从文件中读取地图
                if(i % 2 == 0){ //文件中空格分开，所以只取偶数的
                    maze[cnt][i/2] = tmp[i] - '0';
                    if(maze[cnt][i/2] == 2) { // 地图中为2的，是起点
                        stx = cnt;
                        sty = i/2;
                    }
                    if(maze[cnt][i/2] == 3) { //地图中为3的是终点
                        ex = cnt;
                        ey = i/2;
                    }
                }
            }
            cnt++;

        }
    }
    fclose(pfr);

}

int main()
{
    //readFile();

    while(1){
        cout<<"1.文件中读取"<<endl;
        cout<<"2.手动输入"<<endl;
         int ord;
        cin>>ord;
        if(ord ==1){
            readFile();
        }else if(ord == 2){
              for ( int i = 0; i < 5; i++ )
                for ( int j = 0; j < 5; j++ ){
                    cin >> maze[i][j];
                    if(maze[i][j] == 2)
                    {
                        stx = i; sty = j;
                    }else if(maze[i][j] == 3){
                        ex = i; ey = j;
                    }
                }
        }else{
            cout<<"输入有误"<<endl;
        }

        //printf("从in.in中读取的迷宫如下\n");
        for ( int i = 0; i < 5; i++ ){
            for ( int j = 0; j < 5; j++ ){
                printf("%d ",maze[i][j]);
            }
            puts("");
        }

        bfs();
        printf("最短路径如下\n");
        print(ex*5 + ey);

        saveList();
    }


    return 0;
}

/*
2 1 0 0 0
0 1 0 1 0
0 0 0 0 0
0 1 1 1 0
0 0 0 1 3

*/
