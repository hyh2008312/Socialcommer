import {Input, Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {UserService} from  '../../../shared/services/user/user.service';
import {BonusTipsDialogComponent} from '../bonus-tips-dialog/bonus-tips-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-shop-bonus-item',
  templateUrl: './bonus-item.component.html',
  styleUrls: ['./_bonus-item.scss']
})

export class BonusItemComponent implements OnInit {

  @Input() monthSale: number = 0;
  @ViewChild('myCanvas') canvasRef: ElementRef;

  mySale: any = 0;

  colorList = ['#f8194e','#04bfdb','#f8cd00','#30a1f6','#575757'];

  bonusList: any[] = [{
    bonus: 50,
    sales: 500
  }, {
    bonus: 150,
    sales: 1000
  }, {
    bonus: 350,
    sales: 2000
  }, {
    bonus: 600,
    sales: 3000
  }, {
    bonus: 1000,
    sales: 4000
  }];

  currency: string = 'USD';

  width: number = 150;

  constructor(
    private userService: UserService,
    private elementRef: ElementRef,
    public dialog: MatDialog
  ) {
    this.userService.store.subscribe((data) => {
      if(data) {
        this.currency = data.currency.toUpperCase();
      }
    });
  }

  ngOnInit(): void {
    this.paintBg();
  }

  ngOnChanges() {
    if(this.currency == 'INR') {
      this.monthSale = this.monthSale * 65.4;
      this.bonusList =[{
        bonus: 300,
        sales: 3000
      }, {
        bonus: 900,
        sales: 6000
      }, {
        bonus: 1750,
        sales: 10000
      }, {
        bonus: 3000,
        sales: 15000
      }, {
        bonus: 5000,
        sales: 20000
      }];
    }
    if(this.monthSale != 0) {
      this.paint();
    }
  }

  targetIndex() {
    let index = -1;
    for(let i = 0; i <= this.bonusList.length-1; i++) {
      let sale = this.bonusList[i].sales;
      if(this.monthSale < sale) {
        break;
      }
      index++;
    }
    return index;
  }

  get targetOffSale() {
    let i = this.targetIndex();
    let targeSale = 0;
    if(i < this.bonusList.length - 1) {
      targeSale = this.bonusList[i+1].sales;
    } else {
      targeSale = this.bonusList[i].sales;
    }
    return targeSale - this.monthSale;
  }

  get targetBonus() {
    let i = this.targetIndex();
    if(i < this.bonusList.length - 1) {
      return this.bonusList[i+1].bonus;
    }
    return false;
  }

  get targetOffSalePercent() {
    let i = this.targetIndex();
    let targeSale = 0;
    if(i < this.bonusList.length - 1) {
      targeSale = this.bonusList[i+1].sales;
    } else {
      targeSale = this.bonusList[i].sales;
    }
    return Math.floor((this.monthSale - (i >= 0 ? this.bonusList[i].sales: 0)) / (targeSale - (i >= 0 ? this.bonusList[i].sales: 0)) * 10000) / 100;
  }

  get bonusTarget() {
    return this.bonusList[this.bonusList.length - 1].sales;
  }

  private paint() {

    // Paint current frame
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.width, this.width);

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.arc(this.width/2, this.width/2, 64 , 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    if(this.mySale < this.monthSale - 60) {
      this.mySale += (this.monthSale / 60);
    } else {
      ctx.save();
      ctx.strokeStyle = this.colorList[this.targetIndex()]; //设置描边样式
      ctx.lineCap="round";
      ctx.lineWidth = 16; //设置线宽
      ctx.shadowBlur = 3;
      ctx.shadowColor = 'rgba(0,0,0,0.24)';
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
      ctx.beginPath(); //路径开始
      ctx.arc(this.width/2, this.width/2, 64 ,-Math.PI/2, - Math.PI * 2 * this.monthSale / this.bonusList[this.bonusList.length - 1].sales - Math.PI/2,true);
      //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
      ctx.stroke(); //绘制
      ctx.closePath(); //路径结束
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.strokeStyle = ctx.strokeStyle = this.colorList[this.targetIndex()]; //设置描边样式
    ctx.lineCap="round";
    ctx.lineWidth = 16; //设置线宽
    ctx.shadowBlur = 3;
    ctx.shadowColor = 'rgba(0,0,0,0.24)';
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 2;
    ctx.beginPath(); //路径开始
    ctx.arc(this.width/2, this.width/2, 64 ,-Math.PI/2, - Math.PI * 2 * this.mySale / this.bonusList[this.bonusList.length - 1].sales - Math.PI/2,true);
    //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    ctx.stroke(); //绘制
    ctx.closePath(); //路径结束
    ctx.restore();

    requestAnimationFrame(() => this.paint());
  }

  paintBg() {

    // Paint current frame
    let ctx: CanvasRenderingContext2D =
      this.canvasRef.nativeElement.getContext('2d');

    ctx.clearRect(0, 0, this.width, this.width);

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 16;
    ctx.strokeStyle = 'rgba(0,0,0,0.12)';
    ctx.arc(this.width/2, this.width/2, 64 , 0, Math.PI*2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  openBonusTipDialog() {
    let dialogRef = this.dialog.open(BonusTipsDialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {

    });
  }


}
