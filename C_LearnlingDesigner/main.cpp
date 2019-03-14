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
stream<<n;  //nΪint����
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
        now = que.front(); // ȡ��������ͷԪ��
        que.pop();
        r = now / 5;
        c = now % 5;

        for ( int i = 0; i < 4; i++ )
        {
            tr = r + dir[i][0]; //����4������
            tc = c + dir[i][1];
            next = tr * 5 + tc;
            if ( isLeagal ( tr, tc ) && !vis[next] ) //�������Ϸ�������û�б���ǹ�
            {
                pre[next] = now;
                if(maze[tr][tc] == 3) return ; //�յ㷵��
               // if ( next == 24 ) return;
                vis[next] = true;
                que.push(next);
            }
        }
    }
}


//����
void saveList(){

    FILE *pfw;
    pfw=fopen("out.out","w");
    if (pfw==NULL)
    {
        printf("�ļ�����ʧ��");
        return ;
       // return;
    }

    fprintf(pfw,"%s",tmpchar.c_str());
    fclose(pfw);
    printf("�ļ�����ɹ�\n");

}


void readFile(){ //��ȡ�ļ�

    FILE *pfr;
    printf("������Ҫ��ȡ���ļ���,���Ϻ�׺,����in.in\n");

    char name[40];
    scanf("%s",name);

    pfr = fopen(name,"r");

    if (pfr == NULL)
    {
        printf("�ļ�����ʧ��");
        return ;
    }
    else
    {

        int cnt = 0;
        while (!feof(pfr))
        {
            char str[256] = {0};
            fgets(str, 256, pfr);          //��̬  �����ļ�
            if(strcmp(str,"") == 0){
                break;
            }
            cout<<str<<endl;
            string tmp = str;
            for(int i=0;i<tmp.length();i++){ //���ļ��ж�ȡ��ͼ
                if(i % 2 == 0){ //�ļ��пո�ֿ�������ֻȡż����
                    maze[cnt][i/2] = tmp[i] - '0';
                    if(maze[cnt][i/2] == 2) { // ��ͼ��Ϊ2�ģ������
                        stx = cnt;
                        sty = i/2;
                    }
                    if(maze[cnt][i/2] == 3) { //��ͼ��Ϊ3�����յ�
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
        cout<<"1.�ļ��ж�ȡ"<<endl;
        cout<<"2.�ֶ�����"<<endl;
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
            cout<<"��������"<<endl;
        }

        //printf("��in.in�ж�ȡ���Թ�����\n");
        for ( int i = 0; i < 5; i++ ){
            for ( int j = 0; j < 5; j++ ){
                printf("%d ",maze[i][j]);
            }
            puts("");
        }

        bfs();
        printf("���·������\n");
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
